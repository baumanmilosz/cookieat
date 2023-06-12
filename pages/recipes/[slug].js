import Image from 'next/image'
// import {useEffect, useState} from "react";
// import {useRouter} from "next/router";
import {connectToDB} from "../../utils/database";
import Recipe from "../../models/recipe";
import {useRouter} from "next/router";
import imgPlaceholder from "../../public/img-placeholder.jpeg";
import Link from "next/link";
import {query} from "express-validator";


export default function Product({recipe}) {
  // BELOW CODE IS NECESSARY FOR CLIENT-SIDE FETCHING FROM API DIR

  // const [recipe, setRecipe] = useState(null);
  const router = useRouter()
  console.log(router)
  // const {slug} = router.query;
  // useEffect(() => {
  //   if(slug) {
  //     const fetchRecipe = async () => {
  //       const res = await fetch(`/api/recipes/1` );
  //       const data = await res.json();
  //       setRecipe(data);
  //     }
  //     fetchRecipe()
  //   }
  // }, [slug])


  const _handleRemoveRecipe = async () => {
    const options = {

      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(`/api/recipes/${recipe.id}`, options);
    if (res.ok) router.push('/')
  }
  return <div className="flex h-screen flex-col justify-between">
    <div className="mx-auto mt-16 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mx-auto flex flex-col sm:flex-row">
        <Image
            alt="coffee"
            className="rounded-lg"
            src={recipe?.img !== null ? recipe?.img : imgPlaceholder}
            width={560}
            height={640}
        />
        <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10">
          <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
            <h3>{recipe?.name}</h3>
            <p>{recipe?.level}</p>
          </div>
          <p className="mt-1 text-sm italic text-gray-500">
            {recipe?.short_desc}
          </p>
          <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
          </div>
          <p className="max-w-xl">{recipe?.long_desc}</p>
        </div>
      </div>
     <div className="flex">
       <Link href={`/recipes/edit/${router.query.slug}`} className="mr-5">edit</Link>
       <button onClick={_handleRemoveRecipe}>delete</button>
     </div>
    </div>
  </div>
}

// export const getServerSideProps = async (context) => {
//   try {
//     await connectToDB();
//     const recipe = await Recipe.findOne({id: context.params.slug})
//
//     return { props: {recipe: JSON.parse(JSON.stringify(recipe))} };
//
//   } catch (e) {
//     console.log(e)
//   }
// };


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

//
// export async function getStaticProps({ params }) {
//   console.log('dasdsa')
//
//   return {
//     props: {data: {}},
//
//   }
// }
//
// export async function getStaticPaths() {
//
//   let fullPaths = []
//
//   fullPaths.push({ params: { slug: '1' } })
//
//   return {
//     paths: fullPaths,
//     fallback: 'blocking',
//   }
// }
