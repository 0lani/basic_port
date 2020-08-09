import React from "react";
import { BackTop, Tabs} from 'antd';
import Prism from 'prismjs';
import "../../../resources/less/projects.less"

const ProjectContainer = () => {
  const { TabPane } = Tabs;
  Prism.highlightAll();

  return (
    <React.Fragment>
       <div className="card-container">
        <Tabs tabPosition="left" type="card">
          <TabPane tab="Site" key="1">
            <pre>
              <code class="language-javascript">{`
               
                describe('PrismJS Configuration', () => {
                      const fixturesDir = path.join(__dirname, 'fixtures');

                      fs.readdirSync(fixturesDir).map(caseName => {
                          const fixtureDir = path.join(fixturesDir, caseName);
                          const expectedFile = path.join(fixtureDir, 'expected.js');
                          const optionsFile = path.join(fixtureDir, 'options.json');

                          it("should work with \${caseName.split('-').join(' ')}", () => {
                              const actual = transformSync('import Prism from "prismjs";', {
                                  plugins: [
                                      [plugin, require(optionsFile)]
                                  ],
                                  babelrc: false
                              }).code;
                              const expected = fs.readFileSync(expectedFile).toString();
                              assert.equal(actual.trim(), expected.trim());
                          });
                      });
                  })
                
              `}</code>
            </pre>
          </TabPane>
          <TabPane tab="Dependencies" key="2">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </TabPane>
          <TabPane tab="Database" key="3">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
        </Tabs>
      </div>
      <BackTop>
        <div id="backUp">Top</div>
      </BackTop>
    </React.Fragment>
  )
}

export default ProjectContainer;