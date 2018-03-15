
import java.awt.FlowLayout;
import java.awt.Font;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.NetworkTableEntry;
import edu.wpi.first.networktables.NetworkTableInstance;

public class Board 
{
	public static void main(String[] args)
	{
		new Board().run();
	}
	JFrame frame;
	public void run()
	{
		frame = new JFrame("Narwhalboard");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(new FlowLayout());
		JTextField AutoDelay = new JTextField("0.0", 10);
		JLabel AutoTitle = new JLabel("Autonomous Delay: ");
		AutoDelay.setFont(new Font("Arial", Font.BOLD, 32));
		AutoTitle.setFont(new Font("Arial", Font.BOLD, 24));
		frame.getContentPane().add(AutoTitle);
		frame.getContentPane().add(AutoDelay);
		JFrame.setDefaultLookAndFeelDecorated(true);
		frame.pack();
		frame.setVisible(true);
		NetworkTableInstance inst = NetworkTableInstance.getDefault();
		NetworkTable table = inst.getTable("datatable");
		NetworkTableEntry xEntry = table.getEntry("x");
		NetworkTableEntry yEntry = table.getEntry("y");
		// inst.startClientTeam(TEAM); // where TEAM=190, 294, etc, or use
		// inst.startClient("hostname") or similar
		inst.startDSClient(); // recommended if running on DS computer; this
								// gets the robot IP from the DS
		while (true)
		{
			try
			{
				Thread.sleep(1000);
			}
			catch (InterruptedException ex)
			{
				System.out.println("interrupted");
				return;
			}
			double x = xEntry.getDouble(0.0);
			double y = yEntry.getDouble(0.0);
			System.out.println("X: " + x + " Y: " + y);
		}
	}
	public void addComponent(String key, String value) {
		JLabel label = new JLabel(key + ": ");
		JTextField field = new JTextField(value);
		label.setFont(new Font("Arial", Font.BOLD, 32));
		field.setFont(new Font("Arial", Font.BOLD, 32));
		frame.getContentPane().add(label);
		frame.getContentPane().add(field);
		frame.pack();
	}
}
