import phone from "../../../../resources/images/services_phone.png"
import log from "../../../../resources/images/services_log.png"
import web from "../../../../resources/images/services_web.png"

 const context = [
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat similique officia quis, aut eaque unde autem soluta voluptate recusandae error dolore vel quas excepturi officiis odit, animi suscipit dolor labore.,",
    slug: "web",
    title: "Development",
    acf: {
      service_img: {
        localFile: {
          childImageSharp: {
            fluid: { src: phone },
          },
        },
      },
    },
  },
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat similique officia quis, aut eaque unde autem soluta voluptate recusandae error dolore vel quas excepturi officiis odit, animi suscipit dolor labore.,",
    slug: "design",
    title: "Design",
    acf: {
      service_img: {
        localFile: {
          childImageSharp: {
            fluid: { src: web },
          },
        },
      },
    },
  },
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat similique officia quis, aut eaque unde autem soluta voluptate recusandae error dolore vel quas excepturi officiis odit, animi suscipit dolor labore.,",
    slug: "seo",
    title: "Seo",
    acf: {
      service_img: {
        localFile: {
          childImageSharp: {
            fluid: { src: log },
          },
        },
      },
    },
  },
]

export default context;