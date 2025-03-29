package edu.eci.arsw.collabpaint;

import edu.eci.arsw.collabpaint.model.Point;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class DrawingController {

    @MessageMapping("/newpoint") // Cliente envía aquí los puntos
    @SendTo("/app/newpoint")   // Se envían a todos los suscritos
    public Point sendPoint(Point point) {
        return new Point(point.getX(), point.getY()); // Devuelve el punto a todos los clientes
    }
}
