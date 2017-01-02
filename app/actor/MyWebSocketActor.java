package actor;

import akka.actor.*;

//for print

/**
 * Created by fnsne on 2017/1/2.
 */
public class MyWebSocketActor extends UntypedActor{
    public static Props props(ActorRef out){
        return Props.create(MyWebSocketActor.class, out);
    }

    private final ActorRef out;

    public MyWebSocketActor(ActorRef out){
        this.out = out;
    }

    public void onReceive( Object message ){
        if (message instanceof String){
            out.tell("I received your message:" + message, self());
            System.out.println("Received message : "+message);
        }
    }
}
