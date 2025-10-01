import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { EmpathyEngineApp } from "@/components/empathy-engine-app";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { auth } from "../(auth)/auth";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/guest");
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");
  // Pass the model configuration to our Empathy Engine
  const chatModel = modelIdFromCookie
    ? modelIdFromCookie.value
    : DEFAULT_CHAT_MODEL;

  return (
    <>
      <EmpathyEngineApp
        id={id}
        initialChatModel={chatModel}
        session={session}
      />
      <DataStreamHandler />
    </>
  );
}

//   if (!modelIdFromCookie) {
//     return (
//       <>
//         <Chat
//           autoResume={false}
//           id={id}
//           initialChatModel={DEFAULT_CHAT_MODEL}
//           initialMessages={[]}
//           initialVisibilityType="private"
//           isReadonly={false}
//           key={id}
//         />
//         <DataStreamHandler />
//       </>
//     );
//   }

//   return (
//     <>
//       <Chat
//         autoResume={false}
//         id={id}
//         initialChatModel={modelIdFromCookie.value}
//         initialMessages={[]}
//         initialVisibilityType="private"
//         isReadonly={false}
//         key={id}
//       />
//       <DataStreamHandler />
//     </>
//   );
// }
