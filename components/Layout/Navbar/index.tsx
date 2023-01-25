import {
  Button,
  LINK_CONTAINER_ID,
  LinkContainer,
  NAVBAR_OPTION_ID,
  NavbarContainer,
  NavbarOptionContainer,
} from './styles'
import { routes } from 'value/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()
  return (
    <NavbarContainer>
      <NavbarOptionContainer id={NAVBAR_OPTION_ID}>
        <Button type="button">Menu</Button>
      </NavbarOptionContainer>
      <LinkContainer id={LINK_CONTAINER_ID}>
        <Link
          href="/"
          tabIndex={-1}
        >
          <Button type="button">Home</Button>
        </Link>
        {routes.map(({ title, href }) => (
          <Link
            href={href}
            key={href}
            tabIndex={-1}
          >
            <Button
              type="button"
              $current={href === router.pathname}
            >
              {title}
            </Button>
          </Link>
        ))}
      </LinkContainer>
    </NavbarContainer>
  )
}

export default Navbar
