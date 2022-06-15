import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <p>Filter Reviews by category: </p>
      <ul>
        <li><Link href="/categories/1"><a>PS5</a></Link></li>
        <li><Link href="/categories/2"><a>Xbox</a></Link></li>
        <li><Link href="/categories/3"><a>Switch</a></Link></li>
      </ul>
    </div>
  );
}

export default Navbar;