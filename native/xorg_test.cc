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
    
    number_of_screens = XScreenCount(display);
    fprintf(stderr, "There are %d screens available in this X session\n", number_of_screens);
    root_windows = malloc(sizeof(Window) * number_of_screens);
    for (i = 0; i < number_of_screens; i++) {
        root_windows[i] = XRootWindow(display, i);
    }
    for (i = 0; i < number_of_screens; i++) {
        result = XQueryPointer(display, root_windows[i], &window_returned,
                &window_returned, &root_x, &root_y, &win_x, &win_y,
                &mask_return);
        if (result == True) {
            break;
        }
    }
    if (result != True) {
        fprintf(stderr, "No mouse found.\n");
        return -1;
    }
    printf("Mouse is at (%d,%d)\n", root_x, root_y);

    free(root_windows);
    
    while (true)
    {
        int x, y;
        
        cin >> x;
        cin >> y;
        
        XWarpPointer(displayMain, None, None, 0, 0, 0, 0, x, y);
    }
    
    return 0;
}