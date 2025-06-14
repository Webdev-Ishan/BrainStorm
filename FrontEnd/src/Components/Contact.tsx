

export const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500">
      
<div className="flex items-center mt-12 justify-center p-12 ">
  
  <div className="mx-auto w-full max-w-[550px]">
    <form action="https://formbold.com/s/FORM_ID" method="POST">
      <div className="mb-5">
        <label
          
          className="mb-3 block text-base font-medium text-white"
        >
          FULL NAME
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          
          className="mb-3 block text-base font-medium text-white"
        >
          EMAIL ADDRESS
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@domain.com"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
        
          className="mb-3 block text-base font-medium text-white"
        >
          SUBJECT
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          placeholder="Enter your subject"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          
          className="mb-3 block text-base font-medium text-white"
        >
          Message
        </label>
        <textarea
        
          name="message"
          id="message"
          placeholder="Type your message"
          className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        ></textarea>
      </div>
      <div>
        <button
          className="hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-500 duration-300 border border-black py-3 px-8 text-base font-semibold text-white outline-none"
        >
          SUBMIT
        </button>
      </div>
    </form>
  </div>
</div>
      
    </div>
  )
}


