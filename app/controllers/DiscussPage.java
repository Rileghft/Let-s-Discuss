package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;
import akka.actor.*;
import play.libs.F.*;
import play.mvc.WebSocket;
import play.mvc.LegacyWebSocket;
import actor.*;

/**
 * Created by 楊舜宇 on 2016/12/28.
 */
public class DiscussPage extends Controller{

    public Result index() {
        return ok(index.render());
    }

    public LegacyWebSocket<String> socket(){
        return WebSocket.withActor(MyWebSocketActor::props);
    }
}
