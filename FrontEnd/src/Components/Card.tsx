import { XEmbed } from "react-social-media-embed";
import { FacebookEmbed } from 'react-social-media-embed';
import { InstagramEmbed } from 'react-social-media-embed';
import { LinkedInEmbed } from 'react-social-media-embed';
import { YouTubeEmbed } from 'react-social-media-embed';

interface CardProps {
  type?: string;
  title?: string;
  link: string; // This should be the tweet or post URL
}

export const Card = (props: CardProps) => {
  return (
<div style={{ display: "flex", justifyContent: "center" } }>
  {props.type === "tweet" && (
    <XEmbed url={props.link} width={300} height={300}/>
  )}

  {props.type === "facebook" && (
    <FacebookEmbed url={props.link} width={300} height={300}/>
  )}

  {props.type === "Instagram" && (
    <InstagramEmbed url={props.link} width={300} height={300} />
  )}

  {props.type === "linkedin" && (
    <LinkedInEmbed
      
      url={props.link}
      width={300}
      height={300}
    />
  )}

  {props.type === "Youtube" && (
    <YouTubeEmbed url={props.link} width={300} height={300} />
  )}
</div>

  );
};

