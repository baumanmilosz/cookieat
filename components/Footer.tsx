export default function Footer() {

    const currentYear = new Date().getFullYear();
  return (
    <footer className="center mt-5 flex justify-center space-x-2 bg-[#E7E8EF] p-4 text-xs">
      <p>{currentYear}</p>
      <span>|</span>
      <p>All rights reserved.</p>
    </footer>
  )
}
