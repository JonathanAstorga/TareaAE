import java.io.IOException;
import java.util.Date;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/Servlet")  
public class Servlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String clientId = request.getParameter("clientId");
        String time = new Date().toString();

        
        System.out.println(">> Petición recibida de: " + clientId + " a las " + time);

        
        response.setContentType("text/plain");
        response.getWriter().write("Recibido por instancia en puerto " + request.getLocalPort());
    }
}
 