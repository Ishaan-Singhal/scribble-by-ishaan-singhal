import React, { useState } from "react";

import { Typography, Button, Input, Checkbox } from "neetoui";
import { Container, Header } from "neetoui/layouts";

const General = () => {
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  //const [loading, setLoading] = useState(true);
  const [organizationName, setOrganizationName] = useState();
  const [password, setPassword] = useState();

  return (
    <Container>
      <Header className="border-b border-gray-200" title="General Settings" />
      <div className="flex h-full w-full flex-col items-center justify-start p-2">
        <Typography className="mb-4" style="h4">
          Configure general attributes of Scribble
        </Typography>
        <form className="max-w-lg" onSubmit={() => {}}>
          <Input
            helpText="Customize the Organization Name which is used to show as the site name in Open Graph Tags."
            label="Organization Name"
            value={organizationName}
            onChange={e => setOrganizationName(e.target.value)}
          />
          <div className="border-b mt-5 mb-5" />
          <Checkbox
            checked={isPasswordEnabled}
            id="checkbox_name"
            label="Password Protect Knowledge Base"
            onChange={() => {
              setIsPasswordEnabled(
                prevIsPasswordEnabled => !prevIsPasswordEnabled
              );
            }}
          />
          {isPasswordEnabled ? (
            <Input
              className="mt-3"
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          ) : null}
          <div className="mt-8">
            <Button label="Save Changes" style="primary" type="submit" />
            <Button
              label="Cancel"
              style="text"
              onClick={() => setIsPasswordEnabled(false)}
            />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default General;
