package main;

import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.awt.image.WritableRaster;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.Socket;
import java.net.URL;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.videoio.VideoCapture;

import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.NetworkTableInstance;

/*
class CameraStream extends JPanel {
	
	BufferedImage image;
	
	public static void camRun() throws IOException {
		
		URL url = null;
		try {
			url = new URL("http://10.31.28.2:1811/?action=stream");
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		System.load(Core.NATIVE_LIBRARY_NAME);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		InputStream is = null;
		try {
		  is = url.openStream ();
		  byte[] byteChunk = new byte[4096]; // Or whatever size you want to read in at a time.
		  int n;

		  while ( (n = is.read(byteChunk)) > 0 ) {
		    baos.write(byteChunk, 0, n);
		  }
		}
		catch (IOException e) {
		  System.err.printf ("Failed while reading bytes from %s: %s", url.toExternalForm(), e.getMessage());
		  e.printStackTrace ();
		  // Perform any other exception handling that's appropriate.
		}
		finally {
		  if (is != null) { is.close(); }
		}
	}

    public BufferedImage MatToBufferedImage(Mat frame) {
        //Mat() to BufferedImage
        int type = 0;
        if (frame.channels() == 1) {
            type = BufferedImage.TYPE_BYTE_GRAY;
        } else if (frame.channels() == 3) {
            type = BufferedImage.TYPE_3BYTE_BGR;
        }
        BufferedImage image = new BufferedImage(frame.width(), frame.height(), type);
        WritableRaster raster = image.getRaster();
        DataBufferByte dataBuffer = (DataBufferByte) raster.getDataBuffer();
        byte[] data = dataBuffer.getData();
        frame.get(0, 0, data);

        return image;
    }
	
}
*/


/**
 * Fetches images from the robot's PCVideoServer
 *
 * @author pmalmsten
 */
class TCPImageFetcher {
	  public static final int MAX_IMG_SIZE_BYTES = 500000;
	  public static final int READ_TIMEOUT_MS = 3000;
	  public static final int VIDEO_TO_PC_PORT = 1180;
	  private Socket m_sock = null;
	  private InputStream m_sockistream = null;
	  private byte[] m_imgBuffer = null;
	  private int m_maxImgBufferSize = 0;
	  private ByteArrayInputStream m_baistream = null;
	  private DataInputStream m_daistream = null;
	  private boolean m_initialized = false;
	  private byte[] m_address = null;
	
	/**
	 * Creates a new TCPImageFetcher which will attempt to read from the
	 * given team's robot
	 *
	 * @param teamNumber The team number to use
	 * @throws UnknownHostException
	 * @throws IOException
	 */
	public TCPImageFetcher(int teamNumber) {
	  byte high = (byte) (teamNumber / 100);
	  byte low = (byte) (teamNumber % 100);
	  m_address = new byte[]{10, high, low, 2};
	}
	
	/**
	 * Initializes a TCP connection
	 *
	 * @param addr The address of the remote device
	 * @param port The port to connect to
	 * @throws IOException
	 */
	private void init() throws IOException {
	  m_sock = new Socket(InetAddress.getByAddress(m_address), VIDEO_TO_PC_PORT);
	  m_sock.setSoTimeout(READ_TIMEOUT_MS);
	  m_sockistream = m_sock.getInputStream();
	  m_daistream = new DataInputStream(m_sockistream);
	  m_initialized = true;
	}
	
	/**
	 * Reads and returns an image from the associated socket connection. Blocks
	 * until a valid image arrives.
	 *
	 * @return The image received
	 */
	public BufferedImage fetch() throws IOException {
	  if (!m_initialized) {
	    init();
	  }
	
	  try {
	    byte[] header = new byte[4];
	
	    while (true) {
	      blockingRead(m_sockistream, header, 4);
	
	      // Look for header 1,0,0,0
	      if (!((header[0] == 1) && ((header[1] + header[2] + header[3]) == 0))) {
	        continue;
	      }
	
	      // wait for length integer (4 bytes)
	      while (m_sockistream.available() < 4) {
	      }
	
	      // Read int length of data to follow
	      int imgDataLen = m_daistream.readInt();
	      //System.out.println(" Data Len: " + imgDataLen + "Hex:" + Integer.toHexString(imgDataLen));
	
	      // Read in the expected number of bytes
	      resizeBuffer(imgDataLen);
	      blockingRead(m_sockistream, m_imgBuffer, imgDataLen);
	      m_baistream.reset();
	
	      // Read the image
	      return ImageIO.read(m_baistream);
	    }
	  } catch (IOException ex) {
	    m_sock.close();
	    m_initialized = false;
	    throw ex;
	  }
	}
	
	/**
	 * Ensures that the image buffer byte array is always an appropriate size
	 *
	 * @param size Requested size for the image buffer
	 */
	private void resizeBuffer(int size) {
	  if (size > m_maxImgBufferSize) {
	    if (size > MAX_IMG_SIZE_BYTES) {
	      size = MAX_IMG_SIZE_BYTES;
	    }
	
	    m_maxImgBufferSize = size + 100;
	    m_imgBuffer = new byte[m_maxImgBufferSize];
	    m_baistream = new ByteArrayInputStream(m_imgBuffer);
	  }
	}
	
	/**
	 * Guarantees that the requested number of bytes are read from the given
	 * input stream and are written to the given buffer before returning.
	 *
	 * @param istream Stream to read from.
	 * @param buf Array to write to.
	 * @param requestedBytes Requested number of bytes to read and store.
	 * @throws IOException
	 */
	private void blockingRead(InputStream istream, byte[] buf, int requestedBytes) throws
	    IOException {
	  int offset = 0;
	  while (offset < requestedBytes) {
	    int read = istream.read(buf, offset, requestedBytes - offset);
	
	    if (read < 0) {
	      throw new IOException("Connection interrupted");
	    }
	
	    offset += read;
	  }
	}
}

class ImagePanel extends JComponent {
    private Image image;
    public ImagePanel(Image image) {
        this.image = image;
    }
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.drawImage(image, 0, 0, this);
    }
}

public class board 
{
	public static void main(String[] args) throws IOException
	{

		new board().run();
	}
	JFrame frame;
	public void run()
	{
		// Initial parameters for Board
		frame = new JFrame("Narwhal Dashboard");
		try {
            frame.setContentPane(new ImagePanel(ImageIO.read(new File("src/art/narwhalBackgroundTest.jpg"))));
        } catch (IOException e) {
            e.printStackTrace();
        }
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(new FlowLayout());
		JFrame.setDefaultLookAndFeelDecorated(true);
		
		// Autonomous Delay Block
		JTextField AutoDelay = new JTextField("0.0", 7);
		JLabel AutoTitle = new JLabel("Autonomous Delay: ");
		AutoDelay.setFont(new Font("Arial", Font.BOLD, 24));
		AutoTitle.setFont(new Font("Arial", Font.BOLD, 24));
		frame.getContentPane().add(AutoTitle);
		frame.getContentPane().add(AutoDelay);
		
		// Forklift Position Block
		JLabel forkpos = new JLabel("Forklift Position: ");
		JTextField forkposValue = new JTextField("0.0", 7);
		forkpos.setFont(new Font("Arial", Font.BOLD, 24));
		forkposValue.setFont(new Font("Arial", Font.BOLD, 24));
		frame.getContentPane().add(forkpos);
		frame.getContentPane().add(forkposValue);
		
		// Current Gear Block
		JLabel gearText = new JLabel("Current Gear: ");
		JTextField gearValue = new JTextField("GEAR NOT RETURNED", 15);
		gearText.setFont(new Font("Arial", Font.BOLD, 24));
		gearValue.setFont(new Font("Arial", Font.BOLD, 24));
		frame.getContentPane().add(gearText);
		frame.getContentPane().add(gearValue);
		
		// Camera Stream Block
		// Instruction / Notes: Receive MPEG stream as bit array.
		// Use OpenCV to read the bit stream and display it as a BufferedImage.
		// 10.31.28.2:1180/?action=stream
		TCPImageFetcher imgf = new TCPImageFetcher(3128);
		try {
			imgf.fetch();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
		// Formatting block
		frame.setSize(1600, 900);
		frame.setVisible(true);
		
		// NetworkTable Block
		NetworkTableInstance inst = NetworkTableInstance.getDefault();
		NetworkTable table = inst.getTable("datatable");
		//NetworkTableEntry xEntry = table.getEntry("x");
		//NetworkTableEntry yEntry = table.getEntry("y");
		//NetworkTableEntry timerEntry = table.getEntry("Timer");
		inst.startClient("10.31.28.2"); // where TEAM=190, 294, etc, or use inst.startClient("hostname") or similar
		inst.startDSClient(); // recommended if running on DS computer; this
		// gets the robot IP from the DS
		System.out.println("NarwhalDashboard opened.");
		while (true)
		{
			try
			{
				Thread.sleep(300);
				forkposValue.setText(String.valueOf(table.getEntry("forkliftPosition").getValue().getDouble()));
				gearValue.setText(String.valueOf(table.getEntry("gearValue").getValue().getString()));
			}
			catch (InterruptedException ex)
			{
				System.out.println("NarwhalDashboard interruption error.");
				return;
			}
			//double x = xEntry.getDouble(0.0);
			//double y = yEntry.getDouble(0.0);
			//double MatchTimer = timerEntry.getDouble(0.0);
			//System.out.println("X: " + x + " Y: " + y);
		}
	}
	/*
	public void addComponent(String key, String value) {
		JLabel label = new JLabel(key + ": ");
		JTextField field = new JTextField(value);
		label.setFont(new Font("Arial", Font.BOLD, 32));
		field.setFont(new Font("Arial", Font.BOLD, 32));
		frame.getContentPane().add(label);
		frame.getContentPane().add(field);
		frame.pack();
	}
	*/
	 private static void showInFrame(Mat mat) {
	      JFrame mediaFrame = new JFrame("Media");
	      mediaFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	      mediaFrame.setVisible(true);
	      mediaFrame.setSize(300,300);

	      //Highgui.imwrite("google.com", mat);
	      ImageIcon image = new ImageIcon("google.com");
	      JLabel label = new JLabel("", image, JLabel.CENTER);

	      mediaFrame.add(label);
	      mediaFrame.repaint();
	      mediaFrame.validate();
	      mediaFrame.setVisible(true);
	   }
}
