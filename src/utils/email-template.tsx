import * as React from 'react';

interface EmailTemplateProps {
  header: string;
  body: string;
  footer: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  header,
  body,
  footer,
}) => (
  <div>
    <h1>{header}</h1>
    <br />
    <p>{body}</p>
    <br />
    <p>
      <em>{footer}</em>
    </p>
  </div>
);
