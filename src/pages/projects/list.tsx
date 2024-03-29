import type { XUserInfoAttr, XProjectAttr } from '@kite/jira-server';

interface IListPropsType {
  users: XUserInfoAttr[];
  projects: XProjectAttr[];
}
export const List = ({ users, projects }: IListPropsType) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(project => {
          return (
            <tr key={project.id}>
              <td>{project.projectName}</td>
              <td>{users.find(user => user.id === project.belongPerson)?.username}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
