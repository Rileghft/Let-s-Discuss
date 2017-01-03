package models;

import akka.actor.*;
import java.util.*;
import java.lang.*;

/**
 * Created by fnsne on 2017/1/3.
 */
public class ChatRoom {
    public static List<ActorRef> actors = Collections.synchronizedList(new ArrayList<ActorRef>());

    public ChatRoom(){
    }

    public static void join(String userName, ActorRef actor){
        actors.add(actor);
    }

    public static void notifyAll( Object message ){
        for(int i = 0 ; i < actors.size(); i++){
            actors.get(i).tell("someone said : " + message ,ActorRef.noSender());
        }
    }
}
