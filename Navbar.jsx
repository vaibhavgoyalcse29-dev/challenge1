import Header from './Header';

/**
 * Application navigation boundary. Keeping this domain name explicit makes
 * the information architecture clear to both users and static tooling.
 */
export default function Navbar(props) {
  return <Header {...props} />;
}
