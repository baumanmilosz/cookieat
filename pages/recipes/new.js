import {useRef} from "react";

export default function PageWithJSbasedForm() {
    const hiddenFileInput = useRef(null);
    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = event => {

        hiddenFileInput.current.click();
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file
    const handleChange = event => {

        const fileUploaded = event.target.files[0];
        console.log(fileUploaded);
    };

    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        // Get data from the form.
        console.log(event.target.name.value)
        const data = {
            id: '4',
            name: event.target.name.value
        };

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = '/api/recipes/new';

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        };

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options);


        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
        alert(`Is this your full name: ${result.data}`);
    };
  return (
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto m-10 ">
              <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             htmlFor="grid-first-name">
                          Name
                      </label>
                      <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="name" type="text" placeholder="Dumnplings"/>
                      <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             htmlFor="grid-last-name">
                          Level
                      </label>
                      <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name" type="text" placeholder="Easy"/>
                  </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             htmlFor="grid-last-name">
                          Short description
                      </label>
                      <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name" type="text" placeholder="Easy"/>
                  </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             htmlFor="grid-password">
                          Long description - recipe
                      </label>
                      <textarea
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"  placeholder="Step by step..."/>

                  </div>
              </div>
              <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name" type placeholder="Easy"/>
 <div className="my-5 w-full flex items-center justify-center rounded-md border border-transparent  px-4 py-3 text-base font-medium bg-orange-600 text-white text-xs font-bold shadow-sm hover:bg-orange-500 sm:px-8">
     <input type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            accept="image/*"
            style={{ display: 'none' }} />

     <button type="button" onClick={handleClick}>Upload image</button>
 </div>
              <button
                  type="submit"
                  className="w-full flex items-center justify-center rounded-md border border-transparent  px-4 py-3 text-base font-medium bg-orange-600 text-white text-xs font-bold shadow-sm hover:bg-orange-500 sm:px-8"
              >
                  + Add
              </button>
          </form>
  );
}
