import action from "../../../../resources/images/action_plan.png"
import experience from "../../../../resources/images/exp_start.png"
import presentation from "../../../../resources/images/presentation.png"

const context = [
  {
    content:
      "This first stage is invaluable because it will help us create a storyboard for your ideas. These stories will help drive the project forward but, based on your input, this direction can always change.",
    slug: "plan",
    title: "Design & Planning",
    acf: {
      started_img: {
        src: `${presentation}`,
      },
    },
  },
  {
    content:
      "The second stage will be implementing the most import stories we've first and testing them to make sure their flawless. This stage will also give you incrementally updates to help decide if the current project is on track, based on your time frame.",
    slug: "testing",
    title: "Design Implementation",
    acf: {
      started_img: {
        src: `${action}`,
      },
    },
  },
  {
    content:
      "The third stage will simply be presenting the final project that succefully passed the previous stages.",
    slug: "presentation",
    title: "Project Presentation",
    acf: {
      started_img: {
        src: `${experience}`,
      },
    },
  },
]

export default context;