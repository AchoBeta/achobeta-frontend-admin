type Template = {
  key: number;
  label: string;
  value: string;
}

export const CONTENT_TEMPLATES:Template []= [
  {
    key: 1,
    label: '初试通过1',
    value: `
    亲爱的AchoBeta5.0候选人：
      感谢你对我们实验室的关注并投递了简历。我们非常高兴地通知你，你已经成功通过了我们的初步筛选阶段，进入了面试环节。
      以下为本次面试安排：
      面试日期： 
      面试方式： 
      面试准备： 在面试中，我们将进一步了解你的简历内容、技术能力、以及对前后端开发领域的热情。请准备好分享你的学习经历、技术挑战的解决方案以及你的职业发展愿景。

      我们期待与你的会面，深入了解你的技术能力和学习潜力，以及你在AchoBeta实验室的未来发展。祝你在面试中取得出色的表现！
      再次感谢你对AchoBeta实验室的兴趣和支持。
      祝好！
      AchoBeta实验室
    `
  },
  {
    key: 2,
    label: '初试未通过1',
    value: `
      亲爱的同学你好：

        感谢你对AchoBeta实验室的职位表现出的兴趣并投递了你的简历。我们非常重视每一位申请者，并经过认真的初步筛选后，我们很遗憾地通知你，你的简历未能通过初筛，无法进入下一轮面试环节。

        虽然未能进入下一轮面试，但请不要灰心，希望你继续不断提升自己的技能和经验，期待我们顶峰再会。

        如果您在学习或就业路上有任何困惑，或者想要了解更多关于我们的信息，你任然可以随时联系我们的团队，我们将乐意提供帮助和建议。

        再次感谢你对AchoBeta实验室的关注和支持。祝愿你在学习与未来的职业道路上取得更多的成功！

        祝好！
        AchoBeta实验室
      `
  },

  
  {
    key: 3,
    label: '复试通过1',
    value: `
    亲爱的XXXX同学：
      非常感谢你参加AchoBeta的面试。

      首先，经过团队认真的讨论和评估后，非常高兴地向你宣布，你成功的通过了面试，我们诚挚地邀请你进入AchoBeta的最后一轮考核。

      我们非常认可你在面试中表现出来的技术能力，但我们认为，团队合作同样重要。因此，我们想以协同开发的方式，了解你的开发和团队合作能力，请放心，考核时间不会太长。

      如果你接受这个考核邀请，请在12小时内回复：姓名 + 接受邀请（如“超人强接受邀请”）。

      期待着你的答复，如果你对我们的表达有任何疑问和意见，请随时向我们反馈。

      再次感谢你对AchoBeta实验室的兴趣和支持，祝一切顺利！
      AchoBeta实验室
    `
  },
  {
   key: 4,
   label: '复试未通过1',
   value: `
   亲爱的同学你好：

    感谢你对AchoBeta实验室表现出兴趣并来参加本次面试。我们非常重视每一位面试者，但在经过认真的考量后，我们很遗憾地通知你，你的面试未能通过，无法进入下一轮的考核。

    但请不要灰心，这并不代表你不优秀，只是在某些表现出的能力中与我们不匹配，希望你继续不断提升自己的技能和经验，期待我们顶峰再会。

    如果你在学习或就业路上有任何困惑，或者想要了解更多关于我们的信息，你仍然可以随时联系我们，我们将乐意提供帮助和建议。

    再次感谢你对AchoBeta实验室的关注和支持。祝愿你在学习与未来的职业道路上取得更多的成功！

    祝好！
    AchoBeta实验室
   ` 
  },
  {
    key: 5,
    label: '终试通过1',
    value: `
    亲爱的XXXX同学：
      非常感谢你参加AchoBeta的面试。

      首先，经过你复试的成果和表现，非常高兴地向你宣布，你成功的通过了所有面试，我们诚挚的邀请你成为AchoBeta实验室的一员。

      AchoBeta团队是一个技术导向性的团队，于内部，我们积极学习与交流，钻研新颖的技术以及工程代码。于外部，我们专注于比赛和实习，为成员累积经验。在这里，你会认识到已经在大厂工作和考研上岸的学长、与你志同道合的同学、不同方向却跟你同样志向的朋友。在AchoBeta，我们鼓励创新思维和团队合作，你将发现我们不仅是同事，更是彼此学习、成长的伙伴，我们非常期待你的加入，有你与我们一起，相信AchoBeta会更进一步！

      如果你接受邀请，请在12小时内回复：姓名 + 接受邀请（如“超人强接受邀请”）。

      期待着你的答复，如果你对我们的表达有任何疑问和意见，请随时向我们反馈。

      再次感谢你对AchoBeta实验室的兴趣和支持，祝一切顺利！
      AchoBeta实验室
    `
  },
  {
    key: 6,
    label: '终试未通过1',
    value: `
    亲爱的XXX同学你好：

      首先，我们要赞扬你在AchoBeta实验室复试中所表现出的热情和专业知识。但结合你选择的岗位和你的情况，我们很遗憾的告诉你，你没有通过最后一轮考核。

      这并不代表你不优秀，只是在某些表现出的能力中与我们不匹配，我们相信，每一次挑战都是成长的机会。如果你希望在未来获得关于职业发展或学习资源的建议，请随时与我们联系。

      再次感谢你对AchoBeta实验室的关注和支持。祝愿你在学习与未来的职业道路上取得更多的成功！

      祝好！
      AchoBeta实验室
    `
  },
]