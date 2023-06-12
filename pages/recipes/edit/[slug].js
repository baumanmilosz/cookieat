import {useEffect, useRef, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {convertToBase64} from "../../../utils/convertToBase64";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {Level} from "../../../enums/Level";
import {connectToDB} from "../../../utils/database";
import Recipe from "../../../models/recipe";
import Image from "next/image";
import imgPlaceholder from "../../../public/img-placeholder.jpeg";

function cn(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PageWithJSbasedForm({recipe}) {
const formRef = useRef()
    useEffect(() => {

        if(formRef.current) {
            const form = Array.from(formRef.current);
            form.forEach(formItem => {
                if(formItem.id) {
                    document.getElementById(formItem.id).value = recipe[formItem.id];
                }
            })

        }
    }, [formRef.current])

    const [img, setImg] = useState(null)
    useEffect(() => {
        if(recipe) {
            setImg(recipe?.img  || imgPlaceholder)
        }
    }, [recipe])
    // console.log(recipe)
    const router = useRouter()

    const hiddenFileInput = useRef(null);
    const [isLoading, setLoading] = useState(true)

    const handleClick = event => hiddenFileInput.current.click();

    const handleChange = event =>  {
        const file = event.target.files[0]
        setImg(URL.createObjectURL(file))

    }


    const handleSubmit = async (event) => {

        event.preventDefault();


        const {name, level, short_desc, long_desc} = event.target;
        const file = img !== null ? await convertToBase64(img) : null;

        const data = {
            id: uuidv4(),
            name: name?.value,
            level: level?.value,
            short_desc: short_desc?.value,
            long_desc: long_desc?.value,
            img: file
        };


        const JSONdata = JSON.stringify(data);


        const endpoint = `/api/recipes/${router.query.slug}`;


        const options = {

            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        };


        const response = await fetch(endpoint, options);

        if(response.ok) {
            return router.push('/')
        }

        const json = await response.json();
        const errors = json.errors;
        if(errors?.length) {
            toast.error(errors[0].msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            })
        }


        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.


    };
  if(recipe) {
      return (
          <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-lg mx-auto m-10 ">
              <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             htmlFor="name">
                          Name
                      </label>
                      <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="name" type="text"  />

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
                              <option value={null}>-</option>
                              <option value={Level.EASY}>{Level.EASY.toLowerCase()}</option>
                              <option value={Level.MEDIUM}>{Level.MEDIUM.toLowerCase()}</option>
                              <option value={Level.HARD}>{Level.HARD.toLowerCase()}</option>
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
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <Image
                      alt="product image"
                      src={img || imgPlaceholder}
                      fill
                      className={cn(
                          'object-cover duration-700 ease-in-out group-hover:opacity-75	',
                          isLoading
                              ? 'scale-110 blur-2xl grayscale'
                              : 'scale-100 blur-0 grayscale-0'
                      )}
                      onLoadingComplete={() => setLoading(false)}
                  />
              </div>
              <div className="my-5 w-full flex justify-center rounded-md border border-transparent  text-base font-medium bg-orange-600 text-white text-xs font-bold shadow-sm hover:bg-orange-500 ">
                  <input type="file"
                         ref={hiddenFileInput}
                         onChange={handleChange}
                         accept="image/*"
                         style={{ display: 'none' }} />
                  <button className="bg-red w-full h-full px-4 py-3" type="button" onClick={handleClick}>Change image</button>
              </div>
              <button
                  type="submit"
                  className="w-full flex items-center justify-center rounded-md border border-transparent  px-4 py-3 text-base font-medium bg-orange-600 text-white text-xs font-bold shadow-sm hover:bg-orange-500 sm:px-8"
              >
                  + Update
              </button>
          </form>
      )
  }
  return null
}

export const getStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    slug: '1',
                },
            }, // See the "paths" section below
        ],
        fallback: true, // false or "blocking"
    };
};


export const getStaticProps  = async (context) => {

    try {
        await connectToDB();
        const recipe = await Recipe.findOne({id: context.params.slug})

        return { props: {recipe: JSON.parse(JSON.stringify(recipe))},  revalidate: 10 };

    } catch (e) {
        console.log(e)
    }
};
