---
title: Codeforces Round 706 (Div. 1) 题解 (ABC)
date: 2021-03-11 09:06:00
permalink: /pages/a5117e/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[Codeforces Round #706 (Div. 1) 传送门](http://codeforces.com/contest/1495)

## A. Diamond Miner

大意：x 轴有 n 个点， y 轴有 n 个点，要让 x 轴的点与 y 轴的点两两配对使得距离之和最小。

先让坐标取绝对值。然后呢，由于要抢手速，正确解法一定是 x 轴的点从小到大依次与 y 轴的点从小到大配对，或者相反，总共两种情况。样例 1 帮我们排除了第二种情况，那么问题就解决了。

当然为了严谨，赛后我还是来证明了一发：

你看下面这张图，根据三角形两条边长度之和大于第三边的性质，就有 $AE+BE>AB,CE+DE>CD$，即 $AD+BC>AB+CD$。于是我们证明了，最优策略应该是没有任何交点的。

![img](https://img2020.cnblogs.com/blog/1860292/202103/1860292-20210311010551357-1843387143.png)

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
vector<int> a,b;
void Solve(){
    int n=read(); a.clear(); b.clear();
    repeat(i,0,n*2){
        int x=read(),y=read();
        if(x==0)a.push_back(abs(y));
        else b.push_back(abs(x));
    }
    sort(a.begin(),a.end());
    sort(b.begin(),b.end());
    double ans=0;
    repeat(i,0,n)ans+=sqrt(1ll*a[i]*a[i]+1ll*b[i]*b[i]);
    printf("%.12f\n",ans);
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## B. Let's Go Hiking

大意：n 个数字代表了各个位置的高度。A 先选择一个位置作为 A 的起点，然后 B 也选择一个不同的位置作为 B 的起点。接下来每一回合，A 往左或者右移动一步，然后 B 往左或者右移动一步，要求 A 的高度不断下降，B 的高度不断增加，并且 A 和 B 的位置不同。任意一方无法移动则失败。问 A 是否有必胜策略。

先求出 `pre[i]` 为 A 在位置 i 往左走最多能走几步，`lst[i]` 为 A 在位置 i 往右走最多能走几步。A 能走几步意味着 B 也能走几步（反着走）。我们把高度递增 / 递减的区间称为坡。

如果有两个没有公共位置的坡，且都是最长坡，A 必败。（B 只要完整走完另一个最长坡即可）

如果 A 从初始位置往左往右走，最多能走的步数不一样，那么 A 也必败。（B 放在最长坡的底端或者底端往上一格。如果 A 选择走最长坡，胜负情况取决于它们初始位置的奇偶性，底端或者底端往上一格总有一个位置让 A 失败）

于是 A 唯一获胜可能就是，A 初始位置放在往左往右走都是最长坡，且整个地图只有这两个最长坡的情况。这时候的胜负情况取决于最长坡的奇偶性。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
int a[N],pre[N],lst[N];
void out(int x){
    printf("%lld\n",x);
    exit(0);
}
void Solve(){
    int n=read();
    repeat(i,1,n+1)a[i]=read();
    a[0]=a[n+1]=1e9;
    repeat(i,1,n+1)
        if(a[i]>a[i-1])pre[i]=pre[i-1]+1;
        else pre[i]=1;
    repeat_back(i,1,n+1)
        if(a[i]>a[i+1])lst[i]=lst[i+1]+1;
        else lst[i]=1;
    int mx=max(*max_element(pre+1,pre+n+1),*max_element(lst+1,lst+n+1));
    if(count(pre+1,pre+n+1,mx)==1
    && count(lst+1,lst+n+1,mx)==1
    && max_element(pre+1,pre+n+1)-pre==max_element(lst+1,lst+n+1)-lst)
        out(mx%2);
    out(0);
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; // T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## C. Garden of the Sun

大意：给一个仅包含 "." / "X" 的 $n \times m$ 矩形，X 两两无公共点（不共用边也不共用顶点）。你需要把一些 . 变成 X 使得 X 连通且 X 构成的图没有环。

这题想了挺久的。当时想怎么先让前两行连在一起，各种分类讨论，很晚才发现原来高端的食材往往只要最朴素的烹饪方式（雾）。

考虑把一些行涂满。如果把第 i 行全涂成 X，那么 i-1, i, i+1 这三行变成了一个连通块的。这时我们就会继续把更多的行涂满，那么最密集的填涂方式是，每三行填一行（两行涂一行是不行的，会形成环）。最后在适当的位置点缀一下让整个图连通就行了。

比如

```text
..X..
.....
.X..X
.....
X....
```

我们涂满第 1, 4 行

```text
XXXXX
.....
.X..X
XXXXX
X....
```

然后在下图标有 A 的位置加个 X 就能让两个连通块连在一起。不会产生环是因为 A 下面的 X 的存在，所有标有 B 的位置都一定是 "."。

```text
XXXXX
BAB..
BXB.X
XXXXX
X....
```

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=510; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
char s[N][N];
void Solve(){
    int n=read(),m=read();
    int p=0; if(n%3==0)p=1;
    repeat(i,0,n){
        scanf("%s",s[i]);
    }
    for(int i=p;i<n;i+=3){
        repeat(j,0,m)s[i][j]='X';
    }
    for(int i=p;i+3<n;i+=3){
        int f=0;
        repeat(j,0,m){
            if(s[i+1][j]=='X' || s[i+2][j]=='X'){
                s[i+1][j]=s[i+2][j]='X'; f=1;
                break;
            }
        }
        if(f==0)s[i+1][0]=s[i+2][0]='X';
    }
    repeat(i,0,n)puts(s[i]);
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```
