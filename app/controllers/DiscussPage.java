package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.discuss;
import play.mvc.WebSocket;
import play.mvc.LegacyWebSocket;
import actor.*;
import views.html.index;

/**
 * Created by 楊舜宇 on 2016/12/28.
 */
public class DiscussPage extends Controller{

    public Result index() {
        return ok(index.render());
    }

    public Result discuss(String room) {
        return ok(discuss.render(room));
    }

    public LegacyWebSocket<String> socket(){
        return WebSocket.withActor(MyWebSocketActor::props);
    }
}
