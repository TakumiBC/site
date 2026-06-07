import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

function normalizeUrl(url) {
  return '/' + String(url || '').replace(/^\/+|\/+$/g, '') + '/';
}

function getPostUrl(post) {
  return normalizeUrl(post.data.permalink || `/post/${post.slug}/`);
}

export async function GET(context) {
  const posts = (await getCollection('post')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'Thomas Sing-wing Wu',
    description: 'Writing by Thomas Sing-wing Wu',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description || '',
      pubDate: post.data.date,
      link: getPostUrl(post)
    }))
  });
}
