---
title: Codeforces Round 645 (Div. 2) 题解 (全部6题)
date: 2020-05-27 08:35:00
permalink: /pages/09471a/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

<https://codeforces.com/contest/1358>

## A. Park Lighting

输出 $\lceil \dfrac{ab}2 \rceil$。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int T,a,b;
signed main(){
    cin>>T;
    while(T--){
        cin>>a>>b;
        cout<<(a*b+1)/2<<endl;
    } 
    return 0;
}
```

## B. Maria Breaks the Self-isolation

题面真长。排序，然后求 $a[1]+a[2]+...+a[i]<=i$ 的 $i$ 的最大值。

当然答案要加 $1$ 因为要算上 Maria。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int T,n,a[N];
signed main(){
    cin>>T;
    while(T--){
        cin>>n;
        repeat(i,0,n)cin>>a[i];
        sort(a,a+n);
        int ans=1;
        repeat(i,0,n)if(a[i]<=i+1)ans=i+2; //我编号从0开始有点不同
        cout<<ans<<endl;
    } 
    return 0;
}
```

## C. Celex Update

怎么说呢……比如要从 1 走到 18，有这么两种走法。

![img](https://img2020.cnblogs.com/blog/1860292/202005/1860292-20200527004718462-1255145140.png)

右图比左图数字之和刚刚好多了 1。这说明一旦出现类似 $4, 7, 12$ 这样的上三角形拐角，我们可以让它拐下来变成 $4,8,12$。这样操作 $(y_2-y_1)(x_2-x_1)$ 次后就彻底找不到这种拐角了，因此答案是 $(y_2-y_1)(x_2-x_1)+1$。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int T,x1,x2,y1,y2;
signed main(){
    cin>>T;
    while(T--){
        cin>>x1>>y1>>x2>>y2;
        cout<<(x2-x1)*(y2-y1)+1<<endl;
    }
    return 0;
}
```

## D. The Best Vacation

最优解的区间的右端点一定一定是某个月的月末（这里的区间左右端点都表示某一天）。小证一下，假设有个右端点不是月末的区间，如果左端点（那一天的拥抱次数，下同）大于右端点就让它向左平移，如果左端点小于右端点就让它向右平移，这样总拥抱次数必定增大，因此结论成立 qwq。

这样就容易好多，我们枚举每个月的月末，二分查找区间左端点即可（不二分查找应该也可）。

我这题 fst 了，尴尬至极，代码先删了避免误导（更：现在 ac 了，思路没问题放心食用）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=400010; typedef long long ll;
#define int ll
int T,n,x,a[N],s[N],sum[N];
signed main(){
    cin>>n>>x;
    repeat(i,1,n+1){
        cin>>a[i];
        s[i]=s[i-1]+a[i];
        sum[i]=sum[i-1]+(1+a[i])*a[i]/2;
    }
    repeat(i,n+1,2*n+1){
        a[i]=a[i-n];
        s[i]=s[i-1]+a[i];
        sum[i]=sum[i-1]+(1+a[i])*a[i]/2;
    }
    n*=2;
    int ans=0;
    repeat(i,0,n+1){
        int p=upper_bound(s,s+n+1,s[i]-x)-s;
        if(p==0)continue;
        int t=s[i]-x-s[p-1];
        ans=max(ans,sum[i]-sum[p-1]-(1+t)*t/2);
    }
    cout<<ans<<endl;
    return 0;
}
```

## E. Are You Fired?

官方题解写得好废脑，不看了，还是两位猛男 %lmj %kry 的思路清晰易懂。

要分情况讨论，首先 $x>=0$（或 $x>0$）时，判断所有数之和是否大于 0，是就输出 n，不是输出 -1。

- 怎么证明呢？假设存在一个 $k<n$ 的可行解，这意味着区间 $[1,k],[k+1,2k],...,[blabla,\lfloor \dfrac n k\rfloor k]$ 的区间和都大于 0。取这 $\lfloor \dfrac n k\rfloor$ 个区间并在一起得到区间 $[1,\lfloor \dfrac n k\rfloor k]$，它一定覆盖了区间 $[1,\lceil\dfrac n 2\rceil]$（~~想想是这样的，要证明估计要分类讨论就不证了~~），这个区间剩下的都有 $a[i]=x>=0$。因此 $k=n$ 一定也是一个可行解。我们证明了只要有解，就一定存在 $k=n$ 的解，那么这时只要输出 n 就行了。

第二种情况是 $x<0$（或 $x<=0$），很快排除了 $k\le \lfloor \dfrac n 2\rfloor$ 的答案。这个情况猛男们的解法不完全一致，我分别介绍 $O(n\log n)$ 和 $O(n)$ 两种解法。

- $O(n\log n)$ 解法：因为 $k>\lfloor \dfrac n 2\rfloor$，右端点一定落在右半部分。我们可以枚举区间左端点，计算区间和为负数或者 0 时，对应的右端点的取值范围（不考虑右端点落在左半部分的情况的话，这个取值范围一定是一个区间），因此我们可以排除一些 k 的值，排除的值可以用树状数组维护。最后再找一遍合法的答案即可。
- $O(n)$ 解法：滑动窗口。初始 $[l,r]$ 覆盖了右半部分，如果 $[l,r]$ 区间和小于等于 0，那么不断 l--，如果 $[l,r]$ 区间和大于 0，那么不断 l--,r--（向左平移），向左平移到底了，那么这就是答案，但是一旦碰到了区间和小于等于 0 的情况，我们发现 $[l,r+1],[l,r+2],...,[l,n]$ 区间和也同样小于等于 0，这些答案（$k=r-l+1...n-l+1$）都瞬间蒸发，因此令 $r=n$ 回到第一步继续搜索。

$O(n)$ 解法代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=500010; typedef long long ll;
#define int ll
int T,n,x,a[N],S[N],*s=S+1;
signed main(){
    cin>>n;
    repeat(i,0,(n+1)/2)
        cin>>a[i],s[i]=s[i-1]+a[i];
    cin>>x;
    repeat(i,(n+1)/2,n)
        a[i]=x,s[i]=s[i-1]+a[i];
    if(x>=0)cout<<(s[n-1]>0?n:-1)<<endl,exit(0);
    
    auto calc=[](int l,int r){
        return s[r]-s[l-1];
    };
    int l=(n+1)/2,r=n-1;
    while(1){
        while(l>0 && calc(l-1,r)<=0)l--;
        if(l==0)cout<<-1<<endl,exit(0);
        l--;
        while(l>0 && calc(l-1,r-1)>0)l--,r--;
        if(l==0)cout<<r-l+1<<endl,exit(0);
        l--; r=n-1;
    }
    return 0;
}
```

## F. Tasty Cookie

我看了题解做的，这个表格有很大作用。

![img](https://img2020.cnblogs.com/blog/1860292/202005/1860292-20200527173439343-966635465.png)

然后然后，$n\ge 3$ 的话就模拟好了。正着模拟有点不太行，倒着就非常清晰，因为前缀和一定是递增的。首先把 $b$ 搞成递增（即每次如果 $b$ 是递减就反转一下，如果既不递增也不递减就凉凉），然后在递增的前提下不断求 $b$ 的差分。因为表格里的操作次数最多也就 1.5e6，再乘个常数，cf 神机表示完全无压力。

$n=2$ 的话，一步步模拟肯定不行了，考虑类似求 gcd 的方法，跳着来就行了。$n=1$ 再特判一下。

最终，压行后的代码长这样：

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=500010; typedef long long ll;
#define int ll
int n,cnt;
vector<int> a,b;
deque<char> ans;
void rev(){ //反转b
    reverse(b.begin(),b.end());
    ans.push_front('R');
}
int ok(){ //判断a和b是否相等或者反转相等
    if(a==b)return 1;
    repeat(i,0,n)
        if(a[i]!=b[n-i-1])return 0;
    ans.push_front('R'); //反转当然要记录一下了
    return 1;
}
int down(){ //求差分，(n>=3)
    if(ok())return 1;
    if(b[0]>b[1])rev();
    repeat(i,0,n-1)if(b[i]>=b[i+1])return -1;
    repeat_back(i,1,n)b[i]-=b[i-1];
    ans.push_front('P'); cnt++;
    return 0;
}
void push(int x){ //求x次差分
    cnt+=x;
    b[1]-=b[0]*x;
    while(x--){
        if(ans.size()>N)return;
        ans.push_front('P');
    }
}
int down2(){ //求差分，(n==2)
    if(ok())return 1;
    if(b[0]>b[1])rev();
    if(a[0]>b[0] || a[1]>b[1])return -1;
    int t=max((b[1]-a[1])/b[0],1ll);
    push(t);
    return 0;
}
void output(int ok){ //输出
    if(ok){
        if(cnt<=200000){
            cout<<"SMALL"<<endl<<ans.size()<<endl;
            for(auto i:ans)cout<<i; cout<<endl;
        }
        else cout<<"BIG"<<endl<<cnt<<endl;
    }
    else cout<<"IMPOSSIBLE"<<endl;
}
signed main(){
    cin>>n; a=b=vector<int>(n);
    repeat(i,0,n)cin>>a[i];
    repeat(i,0,n)cin>>b[i];
    if(n==1)output(a[0]==b[0]);
    else if(n==2){
        int flag=0;
        if(a[0]>a[1]){ //先交换一下，方便判断
            swap(a[0],a[1]);
            flag=1;
        }
        int t;
        do t=down2(); while(t==0);
        if(flag)ans.push_front('R');
        output(t==1);
    }
    else{
        int t;
        do t=down(); while(t==0);
        output(t==1);
    }
    return 0;
}
```
