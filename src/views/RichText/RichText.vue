<template>
  <div class="quill-editor">
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
  </div>
</template>

<script>
require("quill/dist/quill.snow.css");
require("quill/dist/quill.bubble.css");
require("quill/dist/quill.core.css");
if (!window.Quill) {
  window.Quill = require("quill/dist/quill.js");
}
export default {
  name: "quill-editor",
  data() {
    return {
      _content: "",
      defaultModules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
          ["link", "image", "video"]
        ]
      }
    };
  },
  props: {
    content: String,
    value: String,
    disabled: Boolean,
    options: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  mounted() {
    this.initialize();
  },
  beforeDestroy() {
    this.quill = null;
  },
  methods: {
    initialize() {
      if (this.$el) {
        //console.log(this.$el)
        // options and instance
        var self = this;
        self.options.theme = self.options.theme || "snow";
        self.options.boundary = self.options.boundary || document.body;
        self.options.modules = self.options.modules || self.defaultModules;
        self.options.modules.toolbar =
          self.options.modules.toolbar !== undefined
            ? self.options.modules.toolbar
            : self.defaultModules.toolbar;
        self.options.placeholder = self.options.placeholder || "请输入";
        self.options.readOnly =
          self.options.readOnly !== undefined ? self.options.readOnly : false;
        self.quill = new Quill(self.$refs.editor, self.options);

        // 编辑器内容
        if (self.value || self.content) {
          self.quill.pasteHTML(self.value || self.content);
        }

        // 如果编辑器失去焦点，将模型标记为触摸
        self.quill.on("selection-change", range => {
          if (!range) {
            self.$emit("blur", self.quill);
          } else {
            self.$emit("focus", self.quill);
          }
        });

        // 如果文本发生变化，则更新模型
        self.quill.on("text-change", (delta, oldDelta, source) => {
          var html = self.$refs.editor.children[0].innerHTML;
          var text = self.quill.getText();
          if (html === "<div><br></div>") html = "";
          self._content = html;
          self.$emit("input", self._content);
          self.$emit("change", {
            editor: self.quill,
            html: html,
            text: text
          });
        });

        // emit ready
        self.$emit("ready", self.quill);
      }
    },
    dasda(e) {
      //console.log(e)
    }
  },
  watch: {
    content(newVal, oldVal) {
      if (this.quill) {
        if (!!newVal && newVal !== this._content) {
          this._content = newVal;
          this.quill.pasteHTML(newVal);
        } else if (!newVal) {
          this.quill.setText("");
        }
      }
    },
    value(newVal, oldVal) {
      if (this.quill) {
        if (newVal !== this._content) {
          this._content = newVal;
          this.quill.pasteHTML(newVal);
        } else if (!newVal) {
          this.quill.setText("");
        }
      }
    },
    disabled(newVal, oldVal) {
      if (this.quill) {
        this.quill.enable(!newVal);
      }
    }
  }
};
</script>

<style>
.ql-container {
  min-height: 500px;
}
.ql-editor {
  min-height: 500px;
}
,
.quill-editor img {
  max-width: 100%;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
