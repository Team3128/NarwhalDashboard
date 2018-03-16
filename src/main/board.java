package main;

import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.NetworkTableInstance;

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
	public static void main(String[] args)
	{
		new board().run();
	}
	JFrame frame;
	public void run()
	{
		// Initial parameters for Board
		frame = new JFrame("Narwhal Dashboard");
		try {
            frame.setContentPane(new ImagePanel(ImageIO.read(new File("src/art/narwhalBackground.jpg"))));
        } catch (IOException e) {
            e.printStackTrace();
        }
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(new FlowLayout());
		JFrame.setDefaultLookAndFeelDecorated(true);
		
		// Autonomous Delay Block
		JTextField AutoDelay = new JTextField("0.0", 10);
		JLabel AutoTitle = new JLabel("Autonomous Delay: ");
		AutoDelay.setFont(new Font("Arial", Font.BOLD, 24));
		AutoTitle.setFont(new Font("Arial", Font.BOLD, 24));
		frame.getContentPane().add(AutoTitle);
		frame.getContentPane().add(AutoDelay);
		
		// Forklift Position Block
		JLabel forkpos = new JLabel("Forklift Position: ");
		JTextField forkposValue = new JTextField("0.0", 10);
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
		
		while (true)
		{
			try
			{
				System.out.println("NarwhalDashboard opened.");
				Thread.sleep(1000);
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
}
