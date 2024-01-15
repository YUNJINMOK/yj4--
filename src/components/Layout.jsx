import NavPage from "./NavPage";

export default function Layout({children}) {
  return (
    <div>
        <NavPage />
        {children}
        <div className="w-full h-64 bg-red-500" />
    </div>
  )
}