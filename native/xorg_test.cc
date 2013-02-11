#include <cstdlib>
#include <iostream>
#include <csignal>

#include <X11/Xlib.h>
#include <X11/Xutil.h>

using namespace std;

Display *displayMain;

void terminate(int param)
{
	cout << "Exiting..." << endl;
	
	if (displayMain != NULL)
		XCloseDisplay(displayMain);
	
	exit(EXIT_SUCCESS);
}

int main(int argc, char **argv)
{
	displayMain = XOpenDisplay(NULL);
	
	if(displayMain == NULL)
	{
		cerr << "Can't find a main display!" << endl;
		exit(EXIT_FAILURE);
	}
	
	void (*prev_fn)(int);
	
	prev_fn = signal (SIGTERM,terminate);
	if (prev_fn==SIG_IGN) signal (SIGTERM,SIG_IGN);
	
	while (true)
	{
		int x, y;
		
		cin >> x;
		cin >> y;
		
		XWarpPointer(displayMain, None, None, 0, 0, 0, 0, x, y);
	}
	
	return 0;
}