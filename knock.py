import socket

def setup_flag_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('0.0.0.0', 31337))
    server.listen(1)
    
    while True:
        connection, address = server.accept()
        data = connection.recv(1024).decode()
        
        if data.strip() == "KNOCK_KNOCK":
            connection.send(b"CTF{p0rt_kn0ck3r_m4st3r}\n")
        else:
            connection.send(b"Try again!\n")
        
        connection.close()

if __name__ == "__main__":
    setup_flag_server()