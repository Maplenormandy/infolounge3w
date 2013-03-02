#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <signal.h>
#include <time.h>
#include <sys/types.h>
#include <sys/inotify.h>

#define EVENT_SIZE  ( sizeof (struct inotify_event) )
#define EVENT_BUF_LEN     ( 1024 * ( EVENT_SIZE + 16 ) )

int fd;
const char* watch_path = "/home/tim/Dropbox/3W Slideshow";
const char* put_path = "/home/tim/Pictures/3W Slideshow";
char watch_file[255];
char put_file[255];

void sig_handler(int signum)
{
  printf("Recieved Ctrl-C Signal...\n");
  /*closing the INOTIFY instance*/
  close( fd );
  exit(EXIT_SUCCESS);
}

int main( )
{
  signal(SIGINT, sig_handler);
  
  int length, i = 0;
  
  int wd;
  char buffer[EVENT_BUF_LEN];

  /*creating the INOTIFY instance*/
  fd = inotify_init();

  /*checking for error*/
  if ( fd < 0 ) {
    perror( "inotify_init" );
  }

  /*adding the “/tmp” directory into watch list. Here, the suggestion is to validate the existence of the directory before adding into monitoring list.*/
  wd = inotify_add_watch( fd, watch_path, IN_CREATE );
  
  if (wd < 0)
  {
    perror( "inotify_add_watch" );
  }
  else
  {

    /*read to determine the event change happens on “/tmp” directory. Actually this read blocks until the change event occurs*/ 
    while ((length = read( fd, buffer, EVENT_BUF_LEN )) >= 0)
    {
      /*actually read return the list of change events happens. Here, read the change event one by one and process it accordingly.*/
      while ( i < length )
      {
        struct inotify_event *event = ( struct inotify_event * ) &buffer[ i ];
        if ( event->len )
        {
          if ( event->mask & IN_CREATE )
          {
            if ( !(event->mask & IN_ISDIR) )
            {
              printf( "New file %s created.\n", event->name );
              sprintf( watch_file, "%s/%s", watch_path, event->name);
              sprintf( put_file, "%s/%s", put_path, event->name );
              
              int ren = rename( watch_file, put_file );
              
              if (ren != 0)
              {
                perror( "rename" );
              }
            }
          }
          i += EVENT_SIZE + event->len;
        }
      }
    }
    
    perror( "read" );
  }
  
  /*removing the “/tmp” directory from the watch list.*/
  inotify_rm_watch( fd, wd );

  /*closing the INOTIFY instance*/
  close( fd );

}
