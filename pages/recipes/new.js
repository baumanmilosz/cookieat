import {useRef, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {convertToBase64} from "../../utils/convertToBase64";
import {useRouter} from "next/router";

export default function PageWithJSbasedForm() {
    const router = useRouter()
    const [img, setImg] = useState(null)
    const hiddenFileInput = useRef(null);
    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = event => hiddenFileInput.current.click();
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file
    const handleChange = event =>  setImg(event.target.files[0])

    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        // Get data from the form.
        const {name, level, short_desc, long_desc} = event.target;
        const file = img !== null ? await convertToBase64(img) : null;

        const data = {
            id: uuidv4(),
            name: name.value,
            level: level.value,
            short_desc: short_desc.value,
            long_desc: long_desc.value,
            img: file
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
        await fetch(endpoint, options);


        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.

        router.push('/')

    };
  return (
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto m-10 ">
              <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             htmlFor="name">
                          Name
                      </label>
                      <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="name" type="text" />

                  </div>
                  <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             htmlFor="grid-state">
                          Level
                      </label>
                      <div className="relative">
                          <select
                              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="level">
                              <option value="EASY">Easy</option>
                              <option value="MEDIUM">Medium</option>
                              <option value="HARD">Hard</option>
                          </select>
                          <div
                              className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                   viewBox="0 0 20 20">
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                              </svg>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             htmlFor="short_desc">
                          Short description
                      </label>
                      <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="short_desc" type="text"/>
                  </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             htmlFor="long_desc">
                          Long description - recipe
                      </label>
                      <textarea
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="long_desc"/>
                  </div>
              </div>
              <div className="my-5 w-full flex justify-center rounded-md border border-transparent  text-base font-medium bg-orange-600 text-white text-xs font-bold shadow-sm hover:bg-orange-500 ">
                 <input type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        accept="image/*"
                        style={{ display: 'none' }} />
                 <button className="bg-red w-full h-full px-4 py-3" type="button" onClick={handleClick}>Upload image</button>
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
