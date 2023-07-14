import { Button } from '../lib/wrapper/chakra/ui'
import { FaAngleRight } from '../lib/wrapper/icons'
import styles from './page.module.css'

export default function Home() {
  return (
    <main>
     <Button variant={"solid"} colorScheme='blue' leftIcon={<FaAngleRight/>}>Button</Button>
    </main>
  )
}
