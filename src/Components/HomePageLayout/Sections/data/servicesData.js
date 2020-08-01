import phone from "../../../../resources/images/services_phone.png"
import log from "../../../../resources/images/services_log.png"
import web from "../../../../resources/images/services_web.png"

 const context = [
  {
    content:
      "Most of my experience comes from working with the MERN stack combined with SQL but I also have experience in other server-side languages like java and php.",
    slug: "web",
    title: "Development",
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
  {
    content:
      "I love design it's always been my favorite part of a project when I get to work on the front-end although I do prefer backend, I dont mind getting involved in designing a front-end.",
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
      "If you're looking for helping getting more visiblility to your website I also help provide seo solutions.",
    slug: "seo",
    title: "Seo",
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
]

export default context;