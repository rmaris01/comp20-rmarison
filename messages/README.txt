README file for lab 6
by Rachel Marison

1. All aspects of the assignment have been correctly implemented.

2. Collaborations: none

3. Hours spent: ~ 3 hours

Question: Is it possible to request the data from a different origin from using XMLHttpRequest?

Answer: Yes it is possible (as can be seen from this lab, replacing "data.json" with "http://messagehub.herokuapp.com/messages.json" in the open method still works). It works because due to the same origin policy, I am able to make GET requests from any URL that has the same protocol, port, and host as my web page. 