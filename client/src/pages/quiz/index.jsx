import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { sendMessage, startNewChat } from "../../api/message";
import { getUser } from "../../api/user";
import { ChatContainer } from "../../components/messages/ChatContainer";
import { ImageNavigation } from "../../components/images/ImageNavigation";

export async function loader({ params }) {
  const user = await getUser(params.userId);
  return { user };
}

export const QuizPage = () => {
  const { user: loadedUser } = useLoaderData();
  const [activeChat, setActiveChat] = useState(0);
  const [user, setUser] = useState(loadedUser);

  const { conversations } = user;
  const images = [];
  conversations.forEach((conversation, index) => {
    const { messages = [] } = conversation;
    messages.forEach((message) => {
      if (message.src)
        images.push({
          src: message.src,
          conversation: index,
          isActive: index === activeChat,
        });
    });
  });

  const handleAnswer = async ({ answer, isNewChat }) => {
    if (isNewChat) {
      const newUser = await startNewChat({
        userId: user.userId,
        conversationId: activeChat,
        answer,
      });
      setUser(newUser);
      setActiveChat(newUser.conversations.length - 1);
    } else {
      const newUser = await sendMessage({
        userId: user.userId,
        conversationId: activeChat,
        answer,
      });
      setUser(newUser);
    }
  };

  const handleGenerate = async () => {
    const newUser = await sendMessage({
      userId: user.userId,
      conversationId: activeChat,
      answer: "Image",
    });
    setUser(newUser);
  };

  const updateActiveChat = (index) => {
    setActiveChat(index);
  };

  const activeConversation = user?.conversations[activeChat];
  return (
    <Box
      sx={{
        height: "inherit",
        display: "flex",
        flexDirection: "column",
        margin: "10px",
      }}
    >
      <h4>Your choices:</h4>
      <Box sx={{ flexGrow: 1, height: "90%" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={10} sx={{ height: "inherit" }}>
            <ChatContainer
              conversation={activeConversation}
              onAnswer={handleAnswer}
              onGenerate={handleGenerate}
            />
          </Grid>
          <Grid
            xs={2}
            sx={{
              height: "inherit",
              bgcolor: "#cfe8fc",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px 0px",
            }}
          >
            <ImageNavigation
              images={images}
              handleImageClick={updateActiveChat}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
