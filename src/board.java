
import java.awt.BorderLayout;
import java.awt.Component;

import javax.swing.JFrame;

import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.NetworkTableEntry;
import edu.wpi.first.networktables.NetworkTableInstance;

public class board {
  public static void main(String[] args) {
	  new board().run();
  }

public void run() {
	JFrame frame = new JFrame("Narwhalboard");
	frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	//frame.getContentPane().add(emptyLabel, BorderLayout.CENTER);
	frame.pack();
	frame.setVisible(true);
    NetworkTableInstance inst = NetworkTableInstance.getDefault();
    NetworkTable table = inst.getTable("datatable");
    NetworkTableEntry xEntry = table.getEntry("x");
    NetworkTableEntry yEntry = table.getEntry("y");
    //inst.startClientTeam(TEAM);  // where TEAM=190, 294, etc, or use inst.startClient("hostname") or similar
    inst.startDSClient();  // recommended if running on DS computer; this gets the robot IP from the DS
    while (true) {
      try {
        Thread.sleep(1000);
      } catch (InterruptedException ex) {
        System.out.println("interrupted");
        return;
      }
      double x = xEntry.getDouble(0.0);
      double y = yEntry.getDouble(0.0);
      System.out.println("X: " + x + " Y: " + y);
    }
  }
}
