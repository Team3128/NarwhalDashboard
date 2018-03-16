package main;

import java.awt.FlowLayout;
import java.awt.Font;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.NetworkTableInstance;

public class board 
{
	public static void main(String[] args)
	{
		new board().run();
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
		// dont change this. dont use addcomponent, i need to be able to change the stuffs.
		JLabel forkpos = new JLabel("Forklift Position: ");
		JTextField forkposValue = new JTextField("0.0", 10);
		forkpos.setFont(new Font("Arial", Font.BOLD, 24));
		forkposValue.setFont(new Font("Arial", Font.BOLD, 24));
		frame.getContentPane().add(forkpos);
		frame.getContentPane().add(forkposValue);
		frame.setSize(1600, 900);
		//frame.pack();. Don't pack, ruins sizing.
		frame.setVisible(true);
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
				Thread.sleep(1000);
				forkposValue.setText(String.valueOf(table.getEntry("forkliftPosition").getValue().getDouble()));
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
