import { redirect } from 'next/navigation'
import { Button } from '@/lib/wrapper/chakra/ui'
import { FaAngleRight } from '@/lib/wrapper/icons'
import styles from '@/app/page.module.css'

export default function Home() {
  //redirect("/public")
  return (
    <main>
     <Button variant={"solid"} colorScheme='blue' leftIcon={<FaAngleRight/>}>Button</Button>
    </main>
  )
}
