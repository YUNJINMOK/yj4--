export default function Changeruntime(time) {
  const hour = Math.floor(time / 60);
  const minures = time % 60;
  return `${hour}시간 ${minures}분`;
}
