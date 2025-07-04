interface CardProps {
  type?: string;
  title?: string;
  link: string;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

export const Card = ({ type, link }: CardProps) => {
  const renderEmbed = () => {
    switch (type?.toLowerCase()) {
      case "tweet":
      case "twitter":
        return (
          <iframe
            src={`https://twitframe.com/show?url=${encodeURIComponent(link)}`}
            width="240"
            height="240"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        );

      case "facebook":
        return (
          <iframe
            src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(link)}&width=240`}
            width="240"
            height="240"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allow="encrypted-media"
            allowFullScreen
          ></iframe>
        );

      case "instagram":
        return (
          <iframe
            src={`https://www.instagram.com/p/${extractInstagramId(link)}/embed`}
            width="240"
            height="240"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        );

      case "linkedin":
        return (
          <iframe
            src={link}
            width="240"
            height="240"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        );

      case "youtube": {
        const id = extractYouTubeId(link);
        return id ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            width="240"
            height="240"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Invalid YouTube URL</p>
        );
      }

      default:
        return <p>Unsupported embed type</p>;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "240px",
        width: "240px",
        overflow: "hidden",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      {renderEmbed()}
    </div>
  );
};

// Helper function for Instagram
function extractInstagramId(url: string): string | null {
  const match = url.match(/instagram\.com\/p\/([^/]+)/);
  return match ? match[1] : null;
}

