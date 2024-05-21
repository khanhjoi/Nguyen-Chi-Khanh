export const importAll = (context: any) => {
  let icons: any = {};
  context.keys().forEach((key: any) => {
    const iconName = key.replace(/^\.\/(.*)\.\w+$/, "$1");
    icons[iconName] = context(key).default;
  });
  return icons;
};
