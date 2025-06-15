interface cardProps {
  type?: string;
  title: string;
  link: string;
}

export const Card = (props: cardProps) => {
  return (
    <div className="w-64 h-64 p-4 bg-white border border-purple-600 rounded-3xl shadow hover:shadow-purple-600 duration-300 flex flex-col justify-between">
  {/* Top Section: Title and Icon */}
  <div className="flex flex-col items-start gap-2">
    <div className="flex justify-between items-center w-full ">
      <h5 className="text-xl font-bold text-blue-600 break-words mr-2">
        {props.title}
      </h5>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-blue-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
        />
      </svg>
    </div>

    {/* Description */}
    <p className="text-sm text-purple-500">
      Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
    </p>
  </div>

  {/* Bottom Button */}
  <a
    href={props.link}
    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-xl hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300"
  >
    Visit Source
    <svg
      className="ml-2 w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
  </a>
</div>


  );
};
