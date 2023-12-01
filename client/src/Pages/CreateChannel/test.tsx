import * as Form from "@radix-ui/react-form";

const CreateChannel = () => {
  return (
    <div>
      HI
      <Form.Root>
        <Form.Field name="username">
          <div className="flex items-baseline justify-between">
            hii
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Email
            </Form.Label>
            <Form.Message
              className="text-[13px] text-white opacity-[0.8]"
              match="valueMissing"
            >
              Please enter your email
            </Form.Message>
            <Form.Message
              className="text-[13px] text-white opacity-[0.8]"
              match="typeMismatch"
            >
              Please provide a valid email
            </Form.Message>
          </div>
        </Form.Field>
      </Form.Root>
    </div>
  );
};

export default CreateChannel;
