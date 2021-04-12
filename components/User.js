import Link from 'next/link'

export default function User({ user }) {
  return (
    <li>
      <Link href="/user/[id]" as={`/user/${user.id}`}>
        <a>{user.name}</a>
      </Link>
    </li>
  )
}
