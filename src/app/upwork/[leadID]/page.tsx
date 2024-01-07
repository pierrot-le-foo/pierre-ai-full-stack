"use client";;
import { useParams } from "next/navigation";
import Chat from "@/components/Chat";

export default function ChatPage() {
  const { leadID } = useParams();

  return <Chat leadID={leadID as string} />;
}
