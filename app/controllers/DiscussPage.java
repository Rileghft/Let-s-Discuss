package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;

/**
 * Created by 楊舜宇 on 2016/12/28.
 */
public class DiscussPage extends Controller{

    public Result index() {
        return ok(index.render());
    }
}
