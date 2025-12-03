import { Resizable, ResizeCallbackData } from 'react-resizable';

export default (
  props: React.HTMLAttributes<any> & {
    onResize: (e: React.SyntheticEvent<Element>, data: ResizeCallbackData) => void;
    width: number;
  },
) => {
  const { onResize, width, ...restProps } = props;
  if (!width) return <th {...restProps} />;
  return (
    <Resizable
      height={0}
      width={width}
      onResize={onResize}
      handle={<span className="react-resizable-handle" onClick={(e) => e.stopPropagation()} />}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};
