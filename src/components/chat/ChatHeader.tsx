import React from "react";
import { Button, CardHeader, CardTitle } from "../ui";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
};

const ChatHeader: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <CardHeader className="border-gray2-anbu flex-shrink-0 border-b">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate(-1)} color="" isIcon>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <CardTitle className="text-yellow-anbu text-xl font-bold tracking-wide">
          {title}
        </CardTitle>
        <div className="w-5" />
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
