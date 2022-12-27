import { readFileSync } from "fs";
import { createYoga, createSchema } from "graphql-yoga";
import { Article } from "../../../__generated__/resolvers-types";

const articles: Article[] = [
  {
    id: "123",
    title: "Nextjs",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum metus lectus, sit amet faucibus odio pretium et. Fusce non risus id ante tincidunt vehicula vitae ac mauris. Donec et mi et risus condimentum placerat. Donec interdum turpis sapien, at rhoncus arcu auctor ac. Nam eget mollis mauris. Duis dapibus ultricies consectetur. Phasellus quis tellus sed ligula accumsan condimentum eu sed tellus. Ut iaculis faucibus dictum. Nunc sit amet velit in sem aliquam convallis pellentesque sed ante. Suspendisse in fermentum lacus. Sed placerat tincidunt erat sit amet iaculis. Vestibulum quis orci aliquet augue gravida fermentum.
Proin ut neque pharetra, tempor tellus mattis, scelerisque neque. Cras sodales, dolor mollis fringilla pulvinar, sapien orci fringilla mi, sit amet euismod augue dolor quis dolor. Maecenas ut odio non dolor cursus venenatis eget id turpis. Morbi in lacus nisl. Morbi dapibus faucibus ex eget pharetra. Aliquam bibendum tellus semper cursus eleifend. Quisque eu interdum neque. Donec id sem eget lectus imperdiet euismod in in quam. Curabitur dignissim ultricies turpis a pellentesque. Quisque dignissim ut nisl at eleifend. Proin porta vulputate nibh id rhoncus. Suspendisse sed leo non diam dapibus dignissim quis eu erat. Vestibulum et quam accumsan, malesuada urna sed, ullamcorper est.
Aliquam elementum dapibus blandit. Vivamus ultrices, nisl non consectetur venenatis, sapien lorem vestibulum risus, id scelerisque neque dui vel dolor. Mauris quis imperdiet ligula. Vivamus molestie efficitur vehicula. Vivamus sodales eros quam, non tempus tortor porttitor id. Etiam hendrerit ligula non nisi fermentum rutrum. Nunc est est, euismod a orci sit amet, eleifend eleifend leo. Morbi consequat at elit vitae elementum. Nam sagittis feugiat erat ac fermentum. Nullam ligula mauris, mollis vel sem ac, consequat blandit eros. Pellentesque nec urna a arcu tristique mattis. Donec turpis dolor, iaculis in magna vel, rutrum volutpat ligula. Nulla orci felis, efficitur a auctor at, commodo in sem. Integer consequat magna sed lorem tempor hendrerit.
Phasellus fringilla quam sit amet leo dictum, eget vestibulum justo auctor. Nulla tristique risus quis turpis accumsan volutpat. Etiam iaculis diam quis lobortis sagittis. Nullam urna tortor, gravida eu libero quis, consectetur imperdiet odio. Nulla vitae nulla id arcu hendrerit rutrum non in elit. Nunc ac lorem finibus, faucibus libero nec, malesuada ipsum. In at pretium enim. Donec pellentesque ullamcorper mauris hendrerit hendrerit. Aliquam non neque leo. Donec iaculis consectetur eros, et interdum nisl ultricies nec. In dapibus, elit et dignissim posuere, tortor justo mattis odio, eu gravida diam nisi ac nunc. Etiam tristique orci eget tellus iaculis, a convallis massa dictum.
Proin enim mi, maximus non ullamcorper ut, maximus vel sapien. Fusce semper placerat erat, eget condimentum justo lobortis vitae. Vestibulum aliquet ante a mauris fringilla varius. Nunc varius ornare lectus, vel tempus nisi faucibus a. Mauris pretium auctor tellus sed laoreet. Suspendisse potenti. Praesent condimentum dignissim congue. Mauris eget leo felis. Aenean vitae erat aliquam, tempus justo quis, rutrum magna. Aliquam erat volutpat. Curabitur ultricies gravida egestas. Nam et mi sit amet ligula commodo iaculis vel vitae mi. Proin facilisis felis non diam tincidunt consectetur. Donec hendrerit venenatis dignissim. Donec auctor diam turpis, sed convallis odio consequat vitae. In viverra sem vitae sem mattis vestibulum.`,
    description: `Short description about the article, very interesting article. Short
description about the article, very interesting article.`,
    image: `https://www.sport5.co.il/Sip_Storage/FILES/9/size624x514/1251649.jpg`,
  },
];

const typeDefs = readFileSync("pages/api/graphql/schemas/schema.graphql", {
  encoding: "utf-8",
});

const resolvers = {
  Query: {
    articles() {
      return articles;
    },
    article(_: any, { id }: { id: string }) {
      return articles.find((article) => article.id === id);
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
