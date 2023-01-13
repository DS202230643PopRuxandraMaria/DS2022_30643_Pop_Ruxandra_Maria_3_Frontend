import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import * as grpcWeb from "grpc-web";
import {ChatServiceClient} from "../../../proto/generated/proto/chat-service_pb_service";
import {ChatMessage, ChatMessageFromServer} from "../../../proto/generated/proto/chat-service_pb";
import {grpc} from "grpc-web-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //@ts-ignore
  chatClient!: ChatClient;

  constructor() {
   // this.javaClient = new ChatServiceClient('http://localhost:8082');
   this.chatClient=new ChatServiceClient('http://localhost:8082')
  }




  sendChatMessage(chatMessage: string,username:string): Observable<ChatMessageFromServer> {
    return new Observable(obs => {
      console.log('ChatService.sendChatMessage');
      const request = new ChatMessage();
      request.setFrom(username);
      request.setMessage(chatMessage);

      const stream = this.chatClient.chat();
      stream.on('status', (status: any) => {
        console.log('ChatService.sendChatMessage.status', status);
      });
      stream.on('data', (message: ChatMessageFromServer) => {
        console.log('ChatService.sendChatMessage.data', message.toObject());
        obs.next(message);
      });
      stream.on('end', () => {
        console.log('ChatService.sendChatMessage.end');
        // obs.complete();
        // obs.error();
      });
      stream.write(request);
    });
  }

  join(username:string){
      const request = new ChatMessage();
      request.setFrom(username);
      request.setMessage("conected");
    const ctx = this;
    this.chatClient = grpc.invoke(join, {
      request: empty,
      host: `http://localhost:8081`,
      onMessage: (chatMessage: Message) => {
        console.log(chatMessage.getMessage());
      },
      onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
        // This section works when server close connection.

        if (code == grpc.Code.OK) {
          console.log('request finished wihtout any error');
        } else {
          console.log('an error occured', code, msg);
        }
      }
    })
    this.chatClient.join(request, (err, message: ChatMessageFromServer) => {
      console.log("inebunesc")
    if(message){
      console.log("Sa fc join",message.getMessage())
    }else{
      console.log("nu sa facurt join")
    }
    })
  }
      //     console.log("User has subscribed: " + username);
      //     })
      //     // this.javaClient.subscribe(subscriptionRequest).on("data", data => {
      //     //   if (!data.getMessage().includes("Error")) {
      //     //     console.log("User has subscribed: " + this.username);
      //     //     // this.setSubscription(true);
      //     //   }
      //     //   // this.appendMessage(data);
      //     // });
    // :Observable<ChatMessageFromServer> {
    // console.log("Dap")
    // return new Observable(obs => {
    //   console.log('ChatService.sendChatMessage');
    //   const request = new ChatMessage();
    //   request.setFrom(username);
    //   request.setMessage("conected");
    //
    //   const stream = this.chatClient.join();
    //   stream.on('status', (status: any) => {
    //     console.log('ChatService.join.status', status);
    //   });
    //   stream.on('data', (message: ChatMessageFromServer) => {
    //     console.log('ChatService.join.data', message.toObject());
    //     obs.next(message);
    //   });
    //   stream.on('end', () => {
    //     console.log('ChatService.join.end');
    //     // obs.complete();
    //     // obs.error();
    //   });
    //   stream.write(request);
    // });


  // sendChatMessage(chatMessage: string,username:string): Observable<ChatMessageFromServer> {
  //   return new Observable(obs => {
  //     console.log('ChatService.sendChatMessage');
  //     const request = new ChatMessage();
  //     request.setSenderUsername(username);
  //     request.setMessage(chatMessage);
  //
  //     const stream = this.javaClient.sendChatMessage();
  //     stream.on('status', (status: any) => {
  //       console.log('ChatService.sendChatMessage.status', status);
  //     });
  //     stream.on('data', (message: ChatMessageFromServer) => {
  //       console.log('ChatService.sendChatMessage.data', message.toObject());
  //       obs.next(message);
  //     });
  //     stream.on('end', () => {
  //       console.log('ChatService.sendChatMessage.end');
  //       // obs.complete();
  //       // obs.error();
  //     });
  //     stream.write(request);
  //   });
  // }
  //
  //
  //   subscribe(username:string) {
  //     const subscriptionRequest = new ChatMessage();
  //     subscriptionRequest.setSenderUsername(username);
  //
  //   // @ts-ignore
  //     this.javaClient.subscribe(subscriptionRequest, (err, message: ChatMessageFromServer) => {
  //     console.log("User has subscribed: " + username);
  //     })
  //     // this.javaClient.subscribe(subscriptionRequest).on("data", data => {
  //     //   if (!data.getMessage().includes("Error")) {
  //     //     console.log("User has subscribed: " + this.username);
  //     //     // this.setSubscription(true);
  //     //   }
  //     //   // this.appendMessage(data);
  //     // });
  //   }

//   sendMessage(message: string,usernameSender:string,usernamaTo:string) {
//     const messageRequest = new MessageRequest();
//     console.log("user s", usernameSender)
//     console.log("user t", usernamaTo)
//     messageRequest.setUsername(usernameSender)
//
//     messageRequest.setMessage(message);
//     //@ts-ignore
//
//       this.chatClient.sendMessage(messageRequest).on("data", data => {
//
//         console.log("ddd", data)
//
//       })
//
//
//
//
//
// //@ts-ignore
//     this.chatClient.sendMessage(messageRequest, (err, message: MessageRequest) => {
//       if (message) {
//
//         // Log errors or messages here.
//         // console.log("Message received: " + message.getUsername());
//         //
//         // console.log("Message received: " + message.getMessage());
//       } else {
//         console.error("An error has occurred.");
//       }
//       }
//     );
//
//   }
//
//   unsubscribe(username:string) {
//
//     console.log("User has unsubscribed: " + username);
//
//     const unsubscriptionRequest = new UnsubscriptionRequest();
//     unsubscriptionRequest.setUsername(username);
// //@ts-ignore
//     this.chatClient.unsubscribe(unsubscriptionRequest, (err, message: Message) => {
//       console.log("Message received: " + message.getUsername());
//       }
//     );
//   }
//
//

  //
  // receiveMessages(): Observable<ChatMessage> {
  //   return new Observable(obs => {
  //     this.initStream(obs);
  //     console.log("sal")
  //   });
  //
  // }
  // private initStream(obs: Subscriber<ChatMessage>): void {
  //   console.log('ApiService.receiveMessages');
  //   const req = new ChatMessage();
  //   const stream = this.client.receiveMessages(req);
  //
  //   stream.on('status', (status: Status) => {
  //     console.log('ApiService.getStream.status', status);
  //   });
  //   stream.on('data', (message: ChatMessage) => {
  //     console.log('ApiService.getStream.data', message.toObject());
  //
  //     obs.next(message);
  //   });
  //   stream.on('end', () => {
  //     console.log('ApiService.getStream.end');
  //     obs.complete();
  //     this.initStream(obs);
  //   });
  //
  // }
  // sendMessage(request: ChatMessage): Promise<ChatMessage> {
  //   return new Promise((resolve, reject) => {
  //      console.log('ApiService.sendMessage', request);
  //
  //     this.client.sendMessage(request, (err, response: any) => {
  //       console.log('ApiService.sendMessage.response', response);
  //       if (err) {
  //         return reject(err);
  //       }
  //       resolve(response);
  //     });
  //     this.receiveMessages();
  //   });
  //
  // }

}
